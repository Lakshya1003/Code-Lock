from agents.risk_analyzer import RiskAnalyzer
import requests
import json

def get_web_condition_data(condition):
    """Fetch condition data from web API"""
    # This is a placeholder - in a real implementation, you would use a medical API
    # For now, we'll use a mock database
    condition_data = {
        'food poisoning': {
            'description': 'Illness caused by eating contaminated food',
            'common_causes': ['Bacteria', 'Viruses', 'Parasites', 'Toxins'],
            'risk_factors': ['Eating raw/undercooked food', 'Poor hygiene', 'Contaminated water'],
            'severity': 'Moderate to High'
        },
        'diabetes': {
            'description': 'Chronic condition affecting blood sugar regulation',
            'common_causes': ['Insulin resistance', 'Autoimmune response', 'Genetic factors'],
            'risk_factors': ['Obesity', 'Family history', 'Sedentary lifestyle'],
            'severity': 'High'
        },
        'high cholesterol': {
            'description': 'High levels of cholesterol in the blood',
            'common_causes': ['Poor diet', 'Lack of exercise', 'Genetic factors'],
            'risk_factors': ['Obesity', 'Smoking', 'High blood pressure'],
            'severity': 'Moderate to High'
        },
        'flu': {
            'description': 'Influenza viral infection',
            'common_causes': ['Influenza viruses'],
            'risk_factors': ['Weakened immune system', 'Age', 'Chronic conditions'],
            'severity': 'Moderate'
        },
        'anxiety': {
            'description': 'Mental health condition characterized by excessive worry',
            'common_causes': ['Genetic factors', 'Brain chemistry', 'Environmental stress'],
            'risk_factors': ['Trauma', 'Stress', 'Other mental health conditions'],
            'severity': 'Moderate'
        }
    }
    return condition_data.get(condition, {})

def main():
    # Initialize the risk analyzer
    analyzer = RiskAnalyzer()
    
    print("Health Risk Analysis System")
    print("Enter your symptoms (e.g., 'I have headache, cough, and dizziness'):")
    print("Type 'quit' to exit")
    
    while True:
        user_input = input("\nEnter symptoms: ").strip()
        
        if user_input.lower() in ['quit', 'exit', 'bye']:
            print("Goodbye! Take care.")
            break
        
        # Get initial analysis
        analysis = analyzer.get_analysis(user_input)
        
        # Display initial results
        print("\nInitial Analysis Results:")
        print(f"Detected Symptoms: {', '.join(analysis['detected_symptoms'])}")
        
        print("\nPotential Conditions and Risk Scores:")
        for condition, score in analysis['potential_conditions'].items():
            risk_percentage = analysis['risk_percentages'].get(condition, 0)
            print(f"- {condition}: {score:.2f} (Risk: {risk_percentage:.1f}%)")
        
        if analysis['follow_up_questions']:
            print("\nFollow-up Questions (Please enter the numbers of symptoms you have, separated by commas):")
            for i, question in enumerate(analysis['follow_up_questions'], 1):
                print(f"{i}. {question}")
            
            # Get follow-up symptom numbers
            follow_up_input = input("\nEnter the numbers of symptoms you have (e.g., 1,3,5): ").strip()
            try:
                selected_numbers = [int(num.strip()) for num in follow_up_input.split(',')]
                selected_symptoms = [analysis['follow_up_questions'][i-1] for i in selected_numbers if 1 <= i <= len(analysis['follow_up_questions'])]
                
                # Combine initial and follow-up symptoms
                all_symptoms = analysis['detected_symptoms'] + selected_symptoms
                
                # Get final analysis with combined symptoms
                final_analysis = analyzer.get_analysis(' '.join(all_symptoms))
                
                print("\nFINAL ANALYSIS:")
                print(f"All Symptoms: {', '.join(all_symptoms)}")
                
                print("\nFinal Risk Assessment:")
                for condition, score in final_analysis['potential_conditions'].items():
                    risk_percentage = final_analysis['risk_percentages'].get(condition, 0)
                    condition_data = get_web_condition_data(condition)
                    
                    print(f"\n{condition.upper()}:")
                    print(f"Risk Score: {score:.2f} (Risk: {risk_percentage:.1f}%)")
                    if condition_data:
                        print(f"Description: {condition_data['description']}")
                        print(f"Common Causes: {', '.join(condition_data['common_causes'])}")
                        print(f"Risk Factors: {', '.join(condition_data['risk_factors'])}")
                        print(f"Severity: {condition_data['severity']}")
                
                print("\nSession ended. Please start a new session for another analysis.")
                break
                
            except ValueError:
                print("Invalid input. Please enter numbers separated by commas.")
                continue

if __name__ == "__main__":
    main() 