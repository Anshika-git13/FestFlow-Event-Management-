import sys
import json
import joblib
import pandas as pd
import os

# Get absolute directory of this script
current_dir = os.path.dirname(__file__)

# Load the trained model & encoders using absolute paths
model = joblib.load(os.path.join(current_dir, 'event_model.pkl'))
encoder = joblib.load(os.path.join(current_dir, 'label_encoder.pkl'))
model_columns = joblib.load(os.path.join(current_dir, 'model_columns.pkl'))

# Read input JSON from stdin
input_data = json.loads(sys.stdin.read())

# Convert input to DataFrame
df = pd.DataFrame([input_data])

# One-hot encode like training
df_encoded = pd.get_dummies(df)

# Add missing columns
for col in model_columns:
    if col not in df_encoded.columns:
        df_encoded[col] = 0

df_encoded = df_encoded[model_columns]

# Predict
pred_label = model.predict(df_encoded)[0]
pred_event_name = encoder.inverse_transform([pred_label])[0]

# Output
print(json.dumps({"recommended_event": pred_event_name}))
