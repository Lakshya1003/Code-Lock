import pandas as pd
from agents.intent_entity_detector import IntentEntityDetector
from agents.symptom_checker import SymptomChecker
from agents.risk_analyzer import RiskAnalyzer
from agents.recommendation_agent import RecommendationAgent
from utils.chat_utils import ChatManager
from utils.llm_api import GeminiAPI

def main():
    # Initialize components
    GEMINI_API_KEY = "AIzaSyB_comlzT38dizPA599eiQ40Tn5zpN-Rko"
    
    # Load dataset
    symptoms_df = pd.read_csv('data/symptoms_disease_dataset.csv')
    
    # Initialize agents
    intent_detector = IntentEntityDetector()
    symptom_checker = SymptomChecker(symptoms_df)
    risk_analyzer = RiskAnalyzer()
    recommendation_agent = RecommendationAgent()
    chat_manager = ChatManager()
    gemini_api = GeminiAPI(GEMINI_API_KEY)
    
    print("Health Chatbot: Hello! I'm here to help. How are you feeling today?")
    print("(Type 'quit', 'exit', or 'bye' to end the conversation)")
    
    while True:
        user_input = input("\nYou: ").strip()
        
        if user_input.lower() in ['quit', 'exit', 'bye']:
            print("\nHealth Chatbot: Goodbye! Take care of yourself.")
            break
        
        # Process user input
        intent_result = intent_detector.detect(user_input)
        
        if not intent_result['is_health_related']:
            response = gemini_api.generate_response(user_input)
            print(f"\nHealth Chatbot: {response}")
            continue
        
        # Health-related conversation flow
        symptoms = intent_result['symptoms']
        conditions = symptom_checker.check_symptoms(symptoms)
        risk_analysis = risk_analyzer.analyze(conditions)
        recommendations = recommendation_agent.generate_recommendations(conditions, risk_analysis)
        
        # Generate response
        response = gemini_api.generate_health_response(
            user_input, conditions, risk_analysis, recommendations
        )
        
        print(f"\nHealth Chatbot: {response}")
        
        if recommendations['specific_recommendations']:
            print("\nAnalysis:")
            print(f"Detected Symptoms: {', '.join(symptoms)}")
            print(f"Possible Conditions: {', '.join(conditions['conditions'])}")
            print(f"Risk Level: {risk_analysis['risk_level']}")
            print("\nRecommendations:")
            for rec in recommendations['specific_recommendations']:
                print(f"- {rec}")
            print(f"\n{recommendations['motivational_message']}")
            print("\nHealth Tips:")
            for tip in recommendations['health_tips']:
                print(f"- {tip}")

if __name__ == "__main__":
    main() 