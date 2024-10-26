from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Store votes in memory
votes = {"option1": 0, "option2": 0}

# Serve the voting page
@app.route("/")
def index():
    return render_template("index.html")

# Handle vote submission
@app.route("/vote", methods=["POST"])
def vote():
    choice = request.json.get("choice")
    if choice in votes:
        votes[choice] += 1
    return jsonify(votes)

@app.route("/results")
def results():
    return jsonify(votes)

if __name__ == "__main__":
    app.run(port=5000)
