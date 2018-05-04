var CommentBox = React.createClass({
    render() {
        <div className="commentBox">
            Hello, world! I am a CommentBox.
        </div>
    }
});

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);


var CommentBox = React.createClass({displayName: 'CommentBox',
    render: function() {
        return (
            React.createElement('div', {className: "commentBox"}, "Hello, world! I am a CommentBox."
            )
        );
    }
});

ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);
