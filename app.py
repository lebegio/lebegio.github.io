from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Store votes in memory
votes = {"option1": 0, "option2": 0}

# Serve the voting page
@app.route("/")
def index():
    print('Index')
    return render_template("index.html")

# Handle vote submission
@app.route("/vote", methods=["POST"])
def vote():
    print('Vote')
    choice = request.json.get("choice")
    if choice in votes:
        votes[choice] += 1
    return jsonify(votes)

@app.route("/results")
def results():
    print('Results')
    return jsonify(votes)

# Replace with your own verification function (TON-related)
def verify_user(wallet_address):
    # Implement your verification logic
    # This can include checking the wallet address against a whitelist
    # or verifying a signed message if needed.
    return True

@app.route('/connect', methods=['POST'])
def connect():
    # Receive the wallet connection data from the frontend
    data = request.json
    wallet_address = data.get("wallet_address")
    
    # Verify the wallet address (dummy verification here for example purposes)
    is_verified = verify_user(wallet_address)
    
    if is_verified:
        return jsonify({"status": "success", "message": "Wallet verified."})
    else:
        return jsonify({"status": "error", "message": "Wallet verification failed."})

if __name__ == "__main__":
    app.run(port=5000)
