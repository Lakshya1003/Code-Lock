import pandas as pd
from typing import List, Dict, Any

class SymptomChecker:
    def __init__(self, symptoms_df: pd.DataFrame):
        """
        Initialize the symptom checker with a symptoms-disease mapping dataset.
        
        Args:
            symptoms_df: DataFrame containing symptom-disease mappings
        """
        self.symptoms_df = symptoms_df
        
    def check_symptoms(self, symptoms: List[str]) -> Dict[str, Any]:
        """
        Map symptoms to possible conditions and calculate probabilities.
        
        Args:
            symptoms: List of symptoms extracted from user input
            
        Returns:
            Dictionary containing possible conditions and their probabilities
        """
        if not symptoms:
            return {'conditions': [], 'confidence': 0.0}
        
        # Find matching conditions for each symptom
        conditions = []
        for symptom in symptoms:
            matches = self.symptoms_df[self.symptoms_df['symptom'] == symptom]
            if not matches.empty:
                conditions.extend(matches['disease'].tolist())
        
        # Calculate condition probabilities
        condition_counts = {}
        for condition in conditions:
            condition_counts[condition] = condition_counts.get(condition, 0) + 1
        
        # Normalize probabilities
        total = len(symptoms)
        condition_probabilities = {
            condition: count/total 
            for condition, count in condition_counts.items()
        }
        
        # Sort by probability
        sorted_conditions = sorted(
            condition_probabilities.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return {
            'conditions': [cond for cond, _ in sorted_conditions],
            'probabilities': dict(sorted_conditions),
            'confidence': max(condition_probabilities.values()) if condition_probabilities else 0.0
        }
    
    def get_condition_details(self, condition: str) -> Dict[str, Any]:
        """
        Get detailed information about a specific condition.
        
        Args:
            condition: Name of the condition
            
        Returns:
            Dictionary containing condition details
        """
        matches = self.symptoms_df[self.symptoms_df['disease'] == condition]
        if matches.empty:
            return {}
        
        return {
            'risk_level': matches.iloc[0]['risk_level'],
            'recommendations': matches.iloc[0]['recommendations'],
            'common_symptoms': matches['symptom'].tolist()
        } 