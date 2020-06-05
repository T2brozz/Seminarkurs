from flask import Flask, render_template, escape, request,url_for, redirect
app = Flask(__name__)


def splitarray(arr):
    list = []
    for elements in arr:
        element = elements.split(',')
        element[1] = element[1][:-1]
        list.append(element)

    return list


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/newscore", methods=['POST'])
def newscore():
    try:
        name = escape(request.json["name"])
        score = escape(request.json["score"])
        print(name + ":" + score)
        with open('score.csv', 'a') as f:
            f.write(score + "," + name + "\n")
            f.close()
        return redirect("/leaderboard")
    except:
        return "Error"


@app.route("/leaderboard")
def ranking():
    with open('score.csv', 'r+') as f:
        Lines = f.readlines()
        f.close()
        Lines = splitarray(Lines)
        sorted_list = sorted(Lines, key=lambda x: int(x[0]), reverse=True)

    return render_template("ranking.html", sorted_list=sorted_list)


if __name__ == '__main__':
    app.run("127.0.0.1", debug=True)
