from flask import Flask, request, jsonify
import torch
import torch.nn.functional as F
from transformers import RobertaTokenizer, RobertaModel

# Initialize Flask app
app = Flask(__name__)

# Initialize tokenizer and model
tokenizer = RobertaTokenizer.from_pretrained('roberta-base')

class RobertaClass(torch.nn.Module):
    def __init__(self):
        super(RobertaClass, self).__init__()
        self.l1 = RobertaModel.from_pretrained("roberta-base")
        self.pre_classifier = torch.nn.Linear(768, 768)

        self.dropout = torch.nn.Dropout(0.3)

        self.classifier = torch.nn.Linear(768, 4)

    def forward(self, input_ids, attention_mask, token_type_ids):
        output_1 = self.l1(input_ids=input_ids, attention_mask=attention_mask, token_type_ids=token_type_ids)

        hidden_state = output_1[0]

        pooler = hidden_state[:, 0]
        pooler = self.pre_classifier(pooler)

        pooler = torch.nn.ReLU()(pooler)
        pooler = self.dropout(pooler)
        output = self.classifier(pooler)
        return output

# Load your custom model
model = RobertaClass()
path = "/app/BACKEND/model"  # Update to your model path
model.load_state_dict(torch.load(path + '/modelRTA.pth', map_location=torch.device('cpu')))
model.eval()

# Define the API route
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON input from request
    data = request.get_json()

    # Validate input
    if 'text' not in data:
        return jsonify({"error": "Text input is required"}), 400
    
    text_input = [data['text']]  # Wrap in a list as tokenizer expects a list
    
    # Tokenize the input
    inputs = tokenizer(
        text_input,
        padding=True,
        truncation=True,
        max_length=512,
        return_tensors='pt',
        return_token_type_ids=True
    )

    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
        probabilities = F.softmax(outputs, dim=1)  # Directly use outputs if it's a tensor
        predicted_class = torch.argmax(probabilities, dim=1).item()
        predictions_percent = probabilities.cpu().numpy()

    # Build response
    response = {
        "predicted_class": predicted_class,
        "probabilities": [round(float(p * 100), 2) for p in predictions_percent.flatten()]
    }
    return jsonify(response)

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
