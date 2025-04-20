from typing import Dict, Any, List
import random
import requests
from bs4 import BeautifulSoup
import json

class RecommendationAgent:
    def __init__(self):
        # Initialize recommendation templates
        self.recommendation_templates = {
            'high': {
                'immediate': [
                    "Seek emergency medical attention immediately",
                    "Call emergency services right away",
                    "Visit the nearest emergency room",
                    "Contact your healthcare provider immediately"
                ],
                'general': [
                    "Stay calm and rest while waiting for medical help",
                    "Have someone stay with you",
                    "Keep emergency contacts readily available",
                    "Prepare your medical history information"
                ]
            },
            'medium': {
                'medical': [
                    "Schedule an appointment with your doctor",
                    "Consult a healthcare professional",
                    "Visit a walk-in clinic",
                    "Contact your primary care physician"
                ],
                'self_care': [
                    "Monitor your symptoms closely",
                    "Keep a symptom diary",
                    "Stay hydrated and rest",
                    "Avoid strenuous activities"
                ]
            },
            'low': {
                'lifestyle': [
                    "Maintain a healthy diet",
                    "Get regular exercise",
                    "Practice stress management",
                    "Ensure adequate sleep"
                ],
                'prevention': [
                    "Wash hands frequently",
                    "Stay up to date with vaccinations",
                    "Practice good hygiene",
                    "Maintain a clean environment"
                ]
            }
        }

        # Web-based motivational quotes
        self.web_motivational_quotes = self._fetch_web_motivational_quotes()

        # Combine web and local motivational messages
        self.motivational_messages = {
            'high': self.web_motivational_quotes.get('high', []) + [
                "Your health is our top priority. Help is on the way, and you're taking the right steps by seeking assistance.",
                "You're showing great strength by addressing this situation. Medical professionals are here to help you through this.",
                "Remember, every step you take towards getting help is a step towards recovery. You're not alone in this journey.",
                "Your proactive approach to your health is commendable. Help is available, and recovery is possible."
            ],
            'medium': self.web_motivational_quotes.get('medium', []) + [
                "Taking care of your health is a sign of wisdom. You're making the right choice by seeking medical advice.",
                "Your commitment to your well-being is inspiring. Together with healthcare professionals, we'll find the best path forward.",
                "Every health journey starts with awareness. You're already on the path to better health by being proactive.",
                "Your health matters, and so do you. Taking these steps shows your dedication to your well-being."
            ],
            'low': self.web_motivational_quotes.get('low', []) + [
                "Small steps lead to big changes. Your commitment to health is making a difference every day.",
                "Your dedication to maintaining good health is admirable. Keep up the great work!",
                "Prevention is the best medicine, and you're doing an excellent job staying on top of your health.",
                "Your healthy choices today are building a stronger tomorrow. Keep up the good work!"
            ]
        }

        # Web-based health tips
        self.web_health_tips = self._fetch_web_health_tips()

        # Combine web and local health tips
        self.health_tips = {
            'general': self.web_health_tips.get('general', []) + [
                "Stay hydrated throughout the day",
                "Get 7-9 hours of sleep nightly",
                "Practice deep breathing exercises",
                "Take regular breaks from screens",
                "Maintain good posture",
                "Stay socially connected",
                "Practice gratitude daily",
                "Keep a regular sleep schedule"
            ],
            'flu': self.web_health_tips.get('flu', []) + [
                "Get plenty of rest",
                "Stay hydrated with warm fluids",
                "Use a humidifier",
                "Gargle with salt water",
                "Take warm showers",
                "Use saline nasal spray",
                "Eat chicken soup",
                "Avoid close contact with others"
            ],
            'anxiety': self.web_health_tips.get('anxiety', []) + [
                "Practice mindfulness meditation",
                "Try progressive muscle relaxation",
                "Keep a worry journal",
                "Limit caffeine intake",
                "Exercise regularly",
                "Maintain a regular routine",
                "Connect with supportive people",
                "Practice deep breathing"
            ],
            'food poisoning': self.web_health_tips.get('food_poisoning', []) + [
                "Stay hydrated with clear fluids",
                "Eat bland foods when ready",
                "Avoid dairy products",
                "Rest as much as possible",
                "Wash hands frequently",
                "Clean surfaces thoroughly",
                "Avoid preparing food for others",
                "Gradually reintroduce solid foods"
            ]
        }

    def _fetch_web_motivational_quotes(self) -> Dict[str, List[str]]:
        """Fetch motivational quotes from web sources."""
        try:
            # This is a placeholder for actual web scraping
            # In a real implementation, you would use a health and wellness API
            return {
                'high': [
                    "Your strength in seeking help is the first step towards healing. You're not alone in this journey.",
                    "Every moment you take care of your health is a moment well spent. Help is on the way.",
                    "Your courage in facing health challenges is inspiring. Medical professionals are here to support you."
                ],
                'medium': [
                    "Your commitment to health is a powerful choice. Together, we'll find the best path forward.",
                    "Taking charge of your health is a sign of wisdom. You're making the right decisions.",
                    "Your proactive approach to wellness is admirable. Keep moving forward with confidence."
                ],
                'low': [
                    "Small, consistent steps lead to lasting health. You're doing great!",
                    "Your dedication to prevention is the foundation of good health. Keep it up!",
                    "Every healthy choice you make is an investment in your future. Stay strong!"
                ]
            }
        except Exception:
            return {}

    def _fetch_web_health_tips(self) -> Dict[str, List[str]]:
        """Fetch health tips from web sources."""
        try:
            # This is a placeholder for actual web scraping
            # In a real implementation, you would use a health information API
            return {
                'general': [
                    "Practice mindful eating to improve digestion",
                    "Incorporate strength training into your routine",
                    "Take regular breaks from sitting",
                    "Practice good sleep hygiene"
                ],
                'flu': [
                    "Use a saline nasal rinse",
                    "Try steam inhalation",
                    "Use a warm compress for sinus relief",
                    "Practice good respiratory hygiene"
                ],
                'anxiety': [
                    "Try grounding techniques",
                    "Practice box breathing",
                    "Use positive affirmations",
                    "Create a calming routine"
                ],
                'food_poisoning': [
                    "Use probiotics to restore gut health",
                    "Try the BRAT diet (bananas, rice, applesauce, toast)",
                    "Stay away from caffeine and alcohol",
                    "Gradually reintroduce fiber"
                ]
            }
        except Exception:
            return {}

    def _generate_random_pattern(self, items: List[str], pattern_type: str = 'alternating') -> List[str]:
        """Generate a random pattern for displaying items."""
        if pattern_type == 'alternating':
            return random.sample(items, len(items))
        elif pattern_type == 'grouped':
            groups = [items[i:i+2] for i in range(0, len(items), 2)]
            random.shuffle(groups)
            return [item for group in groups for item in group]
        else:
            return items

    def _generate_specific_recommendations(self, condition: str, 
                                        condition_details: Dict[str, Any],
                                        risk_level: str) -> List[str]:
        """Generate specific recommendations based on condition and risk level."""
        recommendations = []
        
        # Add immediate actions based on risk level
        if risk_level == 'high':
            recommendations.extend(random.sample(self.recommendation_templates['high']['immediate'], 2))
            recommendations.extend(random.sample(self.recommendation_templates['high']['general'], 2))
        elif risk_level == 'medium':
            recommendations.extend(random.sample(self.recommendation_templates['medium']['medical'], 2))
            recommendations.extend(random.sample(self.recommendation_templates['medium']['self_care'], 2))
        else:
            recommendations.extend(random.sample(self.recommendation_templates['low']['lifestyle'], 2))
            recommendations.extend(random.sample(self.recommendation_templates['low']['prevention'], 2))
        
        # Add condition-specific recommendations
        if condition in self.health_tips:
            recommendations.extend(random.sample(self.health_tips[condition], 2))
        
        # Add general health tips
        recommendations.extend(random.sample(self.health_tips['general'], 2))
        
        # Apply random pattern
        return self._generate_random_pattern(recommendations)

    def _generate_motivational_message(self, risk_level: str) -> str:
        """Generate a motivational message based on risk level."""
        return random.choice(self.motivational_messages.get(risk_level, self.motivational_messages['low']))

    def _select_health_tips(self, condition: str) -> List[str]:
        """Select relevant health tips based on condition."""
        tips = []
        
        # Add condition-specific tips
        if condition in self.health_tips:
            tips.extend(random.sample(self.health_tips[condition], 3))
        
        # Add general health tips
        tips.extend(random.sample(self.health_tips['general'], 3))
        
        # Apply random pattern
        return self._generate_random_pattern(tips)

    def generate_recommendations(self, conditions: Dict[str, Any], 
                               risk_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate health recommendations based on conditions and risk analysis.
        
        Args:
            conditions: Dictionary containing condition information
            risk_analysis: Dictionary containing risk analysis results
            
        Returns:
            Dictionary containing recommendations and motivational messages
        """
        if not conditions.get('conditions'):
            return {
                'recommendations': [],
                'motivational_message': random.choice(self.motivational_messages['low']),
                'health_tips': random.sample(self.health_tips['general'], 3)
            }
        
        # Get the main condition and its details
        main_condition = conditions['conditions'][0]
        condition_details = conditions.get('details', {})
        
        # Generate specific recommendations
        specific_recommendations = self._generate_specific_recommendations(
            main_condition,
            condition_details,
            risk_analysis['risk_level']
        )
        
        # Generate motivational message
        motivational_message = self._generate_motivational_message(
            risk_analysis['risk_level']
        )
        
        # Select relevant health tips
        health_tips = self._select_health_tips(main_condition)
        
        return {
            'specific_recommendations': specific_recommendations,
            'motivational_message': motivational_message,
            'health_tips': health_tips,
            'risk_level': risk_analysis['risk_level']
        } 