from typing import Dict, List, Any, Tuple
import numpy as np
import re
import pandas as pd
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet

class RiskAnalyzer:
    def __init__(self):
        """Initialize the risk analyzer with risk assessment rules."""
        # Define risk levels and their thresholds
        self.risk_levels = {
            'low': 0.3,
            'medium': 0.6,
            'high': 0.8
        }
        
        # Define risk factors and their weights
        self.risk_factors = {
            'symptom_severity': 0.4,
            'condition_urgency': 0.3,
            'symptom_duration': 0.2,
            'age_factor': 0.1
        }
        
        # Common symptoms and their severity weights
        self.symptom_weights = {
            'fever': 0.8,
            'headache': 0.6,
            'cough': 0.7,
            'dizziness': 0.7,
            'dryness': 0.5,
            'fatigue': 0.6,
            'nausea': 0.7,
            'vomiting': 0.8,
            'shortness of breath': 0.9,
            'chest pain': 0.9,
            'abdominal pain': 0.7,
            'diarrhea': 0.6,
            'rash': 0.6,
            'sore throat': 0.5,
            'muscle pain': 0.5,
            'joint pain': 0.6,
            'confusion': 0.8,
            'seizures': 0.9,
            'loss of consciousness': 0.9
        }
        
        # Symptom clusters for common conditions
        self.condition_symptoms = {
            'flu': ['fever', 'cough', 'headache', 'fatigue', 'muscle pain', 'sore throat'],
            'common cold': ['cough', 'sore throat', 'headache', 'fatigue'],
            'migraine': ['headache', 'nausea', 'dizziness', 'sensitivity to light'],
            'dehydration': ['dryness', 'dizziness', 'fatigue', 'confusion'],
            'anxiety': ['dizziness', 'shortness of breath', 'chest pain', 'fatigue'],
            'food poisoning': ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'],
            'allergic reaction': ['rash', 'shortness of breath', 'dizziness'],
            'heart attack': ['chest pain', 'shortness of breath', 'dizziness', 'nausea'],
            'stroke': ['dizziness', 'confusion', 'headache', 'loss of consciousness']
        }
        
        # Follow-up symptoms for each condition
        self.follow_up_symptoms = {
            'flu': ['chills', 'sweating', 'runny nose', 'congestion'],
            'common cold': ['sneezing', 'runny nose', 'congestion', 'mild fever'],
            'migraine': ['sensitivity to sound', 'visual disturbances', 'nausea'],
            'dehydration': ['thirst', 'dark urine', 'dry mouth', 'sunken eyes'],
            'anxiety': ['rapid heartbeat', 'sweating', 'trembling', 'feeling of doom'],
            'food poisoning': ['fever', 'chills', 'weakness', 'loss of appetite'],
            'allergic reaction': ['swelling', 'itching', 'hives', 'wheezing'],
            'heart attack': ['pain in arms', 'jaw pain', 'cold sweat', 'lightheadedness'],
            'stroke': ['numbness', 'trouble speaking', 'vision problems', 'loss of balance']
        }
    
    def analyze(self, conditions: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze health risks based on detected conditions and symptoms.
        
        Args:
            conditions: Dictionary containing condition information from symptom checker
            
        Returns:
            Dictionary containing risk analysis results
        """
        if not conditions['conditions']:
            return {
                'risk_level': 'unknown',
                'confidence': 0.0,
                'factors': {}
            }
        
        # Calculate risk score based on multiple factors
        risk_score = self._calculate_risk_score(conditions)
        
        # Determine risk level
        risk_level = self._determine_risk_level(risk_score)
        
        return {
            'risk_level': risk_level,
            'score': risk_score,
            'confidence': conditions['confidence'],
            'factors': self._get_risk_factors(conditions)
        }
    
    def _calculate_risk_score(self, conditions: Dict[str, Any]) -> float:
        """Calculate overall risk score based on multiple factors."""
        # Get the most probable condition
        main_condition = conditions['conditions'][0]
        condition_prob = conditions['probabilities'][main_condition]
        
        # Calculate weighted risk score
        risk_score = (
            self.risk_factors['condition_urgency'] * self._get_condition_urgency(main_condition) +
            self.risk_factors['symptom_severity'] * self._get_symptom_severity(conditions) +
            self.risk_factors['symptom_duration'] * 0.5 +  # Placeholder for duration
            self.risk_factors['age_factor'] * 0.5  # Placeholder for age
        )
        
        return min(1.0, risk_score * condition_prob)
    
    def _determine_risk_level(self, risk_score: float) -> str:
        """Determine risk level based on risk score."""
        if risk_score >= self.risk_levels['high']:
            return 'high'
        elif risk_score >= self.risk_levels['medium']:
            return 'medium'
        elif risk_score >= self.risk_levels['low']:
            return 'low'
        else:
            return 'very_low'
    
    def _get_condition_urgency(self, condition: str) -> float:
        """Get urgency level for a specific condition."""
        # This would typically come from a medical knowledge base
        urgency_map = {
            'covid-19': 0.9,
            'heart_condition': 0.9,
            'pneumonia': 0.8,
            'flu': 0.6,
            'cold': 0.3,
            'stress': 0.4,
            'anxiety': 0.5
        }
        return urgency_map.get(condition, 0.5)
    
    def _get_symptom_severity(self, conditions: Dict[str, Any]) -> float:
        """Calculate symptom severity based on the number and type of symptoms."""
        # This would typically use a more sophisticated scoring system
        num_symptoms = len(conditions['conditions'])
        return min(1.0, num_symptoms * 0.2)
    
    def _get_risk_factors(self, conditions: Dict[str, Any]) -> Dict[str, float]:
        """Get detailed risk factors for the analysis."""
        return {
            'condition_urgency': self._get_condition_urgency(conditions['conditions'][0]),
            'symptom_severity': self._get_symptom_severity(conditions),
            'symptom_duration': 0.5,  # Placeholder
            'age_factor': 0.5  # Placeholder
        }

    def extract_symptoms(self, text: str) -> List[str]:
        """Extract symptoms from user input text."""
        # Convert to lowercase and remove punctuation
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)
        
        # Tokenize the text
        tokens = word_tokenize(text)
        
        # Find matching symptoms
        found_symptoms = []
        for symptom in self.symptom_weights.keys():
            if symptom in text:
                found_symptoms.append(symptom)
            else:
                # Check for variations of the symptom
                for token in tokens:
                    if token in symptom or symptom in token:
                        found_symptoms.append(symptom)
                        break
        
        return list(set(found_symptoms))  # Remove duplicates

    def analyze_risk(self, symptoms: List[str]) -> Tuple[Dict[str, float], List[str]]:
        """Analyze risk based on symptoms and return potential conditions and follow-up questions."""
        condition_scores = {}
        
        # Calculate scores for each condition
        for condition, condition_symptoms in self.condition_symptoms.items():
            score = 0.0
            matched_symptoms = []
            
            for symptom in symptoms:
                if symptom in condition_symptoms:
                    score += self.symptom_weights.get(symptom, 0.5)
                    matched_symptoms.append(symptom)
            
            if matched_symptoms:
                # Normalize score based on number of matched symptoms
                score = score / len(condition_symptoms)
                condition_scores[condition] = score
        
        # Sort conditions by score
        sorted_conditions = dict(sorted(condition_scores.items(), key=lambda x: x[1], reverse=True))
        
        # Get follow-up symptoms for top conditions
        follow_up_questions = []
        for condition in list(sorted_conditions.keys())[:2]:  # Top 2 conditions
            follow_up_questions.extend(self.follow_up_symptoms.get(condition, []))
        
        return sorted_conditions, list(set(follow_up_questions))

    def calculate_risk_percentage(self, condition_scores: Dict[str, float]) -> Dict[str, float]:
        """Calculate risk percentage for each condition."""
        total_score = sum(condition_scores.values())
        if total_score == 0:
            return {}
            
        risk_percentages = {}
        for condition, score in condition_scores.items():
            risk_percentages[condition] = (score / total_score) * 100
            
        return risk_percentages

    def get_analysis(self, user_input: str) -> Dict:
        """Get complete analysis for user input."""
        # Extract symptoms
        symptoms = self.extract_symptoms(user_input)
        
        # Analyze risk and get follow-up questions
        condition_scores, follow_up_questions = self.analyze_risk(symptoms)
        
        # Calculate risk percentages
        risk_percentages = self.calculate_risk_percentage(condition_scores)
        
        return {
            'detected_symptoms': symptoms,
            'potential_conditions': condition_scores,
            'risk_percentages': risk_percentages,
            'follow_up_questions': follow_up_questions
        } 