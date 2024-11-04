from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from keras.layers import TextVectorization, StringLookup
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


model = tf.keras.models.load_model(
    './model/my_model.keras',
    custom_objects={'TextVectorization': TextVectorization, 'StringLookup': StringLookup}
)

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    try:
        data = request.get_json()

        if 'text' not in data:
            return jsonify({'error': 'No se ingresó texto'}), 400

        text_input = data['text']

        if text_input == '':
            return jsonify({'error': 'No se ingresó texto'}), 400

        array_input = [text_input]
        
        predictions = model(tf.constant(array_input))

        predictions_percent = (predictions.numpy() * 100).tolist()
        
        return jsonify({'predicted_class': predictions_percent})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)