# AI Health Chatbot

An intelligent chatbot system that performs disease risk analysis based on free-form user input, providing health recommendations and support.

## Features

- Natural language conversation interface
- Health-related intent detection
- Symptom analysis and condition mapping
- Risk assessment and analysis
- Personalized health recommendations
- Motivational support messages
- Context-aware responses

## Project Structure

```
📁 ai-health-chatbot/
├── 📁 notebooks/
│   └── main_chatbot_pipeline.ipynb    # Main notebook for the system
├── 📁 data/
│   └── symptoms_disease_dataset.csv    # Sample symptom-disease mapping
├── 📁 agents/
│   ├── intent_entity_detector.py      # Detect user intent and extract symptoms
│   ├── symptom_checker.py             # Map symptoms to conditions
│   ├── risk_analyzer.py               # Evaluate health risks
│   └── recommendation_agent.py        # Generate health advice
└── 📁 utils/
    ├── chat_utils.py                  # Conversation management
    └── llm_api.py                     # Gemini API integration
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Download required NLTK data:
   ```python
   import nltk
   nltk.download('punkt')
   nltk.download('wordnet')
   nltk.download('averaged_perceptron_tagger')
   ```
4. Download spaCy model:
   ```bash
   python -m spacy download en_core_web_sm
   ```

## Usage

1. Open `notebooks/main_chatbot_pipeline.ipynb` in Jupyter
2. Run the notebook cells to initialize the system
3. Use the chat interface to interact with the chatbot

## System Pipeline

1. **User Input**: Free-form text describing symptoms or health concerns
2. **Intent Detection**: Identify health-related content and extract symptoms
3. **Symptom Analysis**: Map symptoms to possible conditions
4. **Risk Assessment**: Evaluate health risks based on conditions
5. **Recommendation Generation**: Provide personalized health advice
6. **Response Generation**: Create empathetic and informative responses

## Dependencies

- Python 3.8+
- Jupyter Notebook
- Required packages listed in `requirements.txt`

## Note

This is a demonstration system and should not be used as a substitute for professional medical advice. Always consult with healthcare professionals for medical concerns.

## License

MIT License 