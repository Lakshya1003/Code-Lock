import requests
import json
from typing import Dict, List, Any

class GeminiAPI:
    def __init__(self, api_key: str):
        """
        Initialize the Gemini API client.
        
        Args:
            api_key: Gemini API key
        """
        self.api_key = api_key
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
        self.headers = {
            "Content-Type": "application/json"
        }
        
        # Default responses for different scenarios
        self.default_responses = {
            'greeting': [
                "Hello! How can I help you today?",
                "Hi there! I'm here to assist you.",
                "Welcome! How are you feeling today?"
            ],
            'health_concern': [
                "I understand you're not feeling well. Let me help analyze your symptoms.",
                "I hear your health concerns. Let's look at this together.",
                "Thank you for sharing your symptoms. I'll help you understand what might be going on."
            ],
            'error': [
                "I'm having trouble processing that right now. Could you please rephrase?",
                "I apologize for the technical difficulty. Could you try explaining your concern again?",
                "I'm experiencing a temporary issue. Please try again in a moment."
            ]
        }
    
    def generate_response(self, prompt: str) -> str:
        """
        Generate a general response using Gemini or fallback to default responses.
        
        Args:
            prompt: User input prompt
            
        Returns:
            Generated response text
        """
        try:
            # Check for common patterns first
            lower_prompt = prompt.lower()
            
            # Handle greetings
            if any(word in lower_prompt for word in ['hi', 'hello', 'hey']):
                return self._get_random_response('greeting')
            
            # Try Gemini API
            data = {
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }]
            }
            
            response = self._make_request(data)
            result = self._extract_response_text(response)
            
            return result if result else self._get_random_response('error')
            
        except Exception as e:
            print(f"API Error: {str(e)}")
            return self._get_random_response('error')
    
    def generate_health_response(self, user_input: str, conditions: Dict[str, Any],
                               risk_analysis: Dict[str, Any], recommendations: Dict[str, Any]) -> str:
        """
        Generate a health-focused response, with fallback to template-based response.
        
        Args:
            user_input: Original user input
            conditions: Detected conditions
            risk_analysis: Risk analysis results
            recommendations: Generated recommendations
            
        Returns:
            Generated health response
        """
        try:
            # Create a template-based response as fallback
            template_response = self._create_template_response(
                conditions, risk_analysis, recommendations
            )
            
            # Try Gemini API first
            prompt = self._create_health_prompt(user_input, conditions, risk_analysis, recommendations)
            
            data = {
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }]
            }
            
            response = self._make_request(data)
            result = self._extract_response_text(response)
            
            return result if result else template_response
            
        except Exception as e:
            print(f"API Error: {str(e)}")
            return template_response
    
    def _make_request(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Make a request to the Gemini API."""
        url = f"{self.base_url}?key={self.api_key}"
        response = requests.post(url, headers=self.headers, json=data)
        return response.json()
    
    def _extract_response_text(self, response: Dict[str, Any]) -> str:
        """Extract the response text from the API response."""
        try:
            return response['candidates'][0]['content']['parts'][0]['text']
        except (KeyError, IndexError):
            return ""
    
    def _create_health_prompt(self, user_input: str, conditions: Dict[str, Any],
                            risk_analysis: Dict[str, Any], recommendations: Dict[str, Any]) -> str:
        """Create a health-focused prompt for the Gemini API."""
        prompt = f"""
        You are a helpful and empathetic health assistant. A user has described their symptoms and concerns.
        
        User Input: {user_input}
        
        Detected Conditions: {', '.join(conditions['conditions'])}
        Risk Level: {risk_analysis['risk_level']}
        
        Recommendations:
        {chr(10).join(recommendations['specific_recommendations'])}
        {recommendations['motivational_message']}
        
        Health Tips:
        {chr(10).join(recommendations['health_tips'])}
        
        Please provide a compassionate and informative response that:
        1. Acknowledges the user's concerns
        2. Summarizes the key findings in simple terms
        3. Provides the recommendations in a supportive way
        4. Offers encouragement and next steps
        
        Keep the response conversational and empathetic while maintaining medical accuracy.
        """
        
        return prompt
    
    def _create_template_response(self, conditions: Dict[str, Any],
                                risk_analysis: Dict[str, Any],
                                recommendations: Dict[str, Any]) -> str:
        """Create a template-based response when API fails."""
        if not conditions['conditions']:
            return self._get_random_response('health_concern')
        
        condition = conditions['conditions'][0]
        risk_level = risk_analysis['risk_level']
        
        response = f"Based on your symptoms, it appears you may have {condition}. "
        
        if risk_level == 'high':
            response += "This condition requires immediate medical attention. "
        elif risk_level == 'medium':
            response += "It's recommended to consult with a healthcare provider. "
        else:
            response += "This condition is generally manageable with proper care. "
        
        if recommendations['specific_recommendations']:
            response += recommendations['specific_recommendations'][0]
        
        response += f"\n\n{recommendations['motivational_message']}"
        
        return response
    
    def _get_random_response(self, category: str) -> str:
        """Get a random response from the specified category."""
        import random
        return random.choice(self.default_responses[category]) 