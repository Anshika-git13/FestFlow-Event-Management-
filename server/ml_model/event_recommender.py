# server/ml_model/event_recommender.py

import sys
import json
import joblib
import pandas as pd

# Load the model
model_data = joblib.load("E:/Placements/PROJECTS/festflow/data/festflow_model.pkl")
model = model_data['model']
preprocessor = model_data['preprocessor']

# Get input from Node
user_input = json.loads(sys.argv[1])

# Create DataFrame from input
df = pd.DataFrame([user_input])

# Transform and predict
X = preprocessor.transform(df)
prediction = model.predict(X)

print(int(prediction[0]))
