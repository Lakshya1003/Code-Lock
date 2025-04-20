import nltk
from typing import Dict, List, Any
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet

class IntentEntityDetector:
    def __init__(self):
        # Define health-related keywords
        self.health_keywords = {
            'symptoms': ['pain', 'ache', 'fever', 'headache', 'nausea', 'dizziness',
                        'fatigue', 'cough', 'sore', 'swelling', 'rash', 'bleeding'],
            'conditions': ['sick', 'ill', 'disease', 'infection', 'injury', 'allergy',
                          'asthma', 'diabetes', 'cancer', 'flu', 'cold'],
            'body_parts': ['head', 'chest', 'stomach', 'back', 'arm', 'leg', 'throat',
                          'nose', 'ear', 'eye', 'heart', 'lung']
        }
    
    def detect(self, text: str) -> Dict[str, Any]:
        """
        Detect if the input is health-related and extract relevant entities.
        
        Args:
            text: User input text
            
        Returns:
            Dictionary containing detection results
        """
        # Tokenize the text
        tokens = word_tokenize(text.lower())
        
        # Check for health-related intent
        is_health_related = self._check_health_intent(tokens)
        
        # Extract symptoms
        symptoms = self._extract_symptoms(tokens)
        
        return {
            'is_health_related': is_health_related,
            'symptoms': symptoms,
            'raw_text': text
        }
    
    def _check_health_intent(self, tokens: List[str]) -> bool:
        """Check if the text contains health-related content."""
        # Check for health-related keywords
        for token in tokens:
            if any(token in keywords for keywords in self.health_keywords.values()):
                return True
        
        # Check for health-related patterns
        text = ' '.join(tokens)
        health_patterns = [
            "i feel", "i'm feeling", "i have", "i've got",
            "my [body_part] hurts", "i'm sick", "i'm ill"
        ]
        
        return any(pattern in text for pattern in health_patterns)
    
    def _extract_symptoms(self, tokens: List[str]) -> List[str]:
        """Extract symptoms from the text."""
        symptoms = []
        
        # Extract symptoms using keyword matching
        for token in tokens:
            if token in self.health_keywords['symptoms']:
                symptoms.append(token)
        
        # Extract compound symptoms (e.g., "chest pain")
        for i in range(len(tokens) - 1):
            if tokens[i] in self.health_keywords['body_parts'] and tokens[i + 1] in self.health_keywords['symptoms']:
                symptoms.append(f"{tokens[i]} {tokens[i + 1]}")
        
        return list(set(symptoms))  # Remove duplicates 