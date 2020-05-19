class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = { biomes: [] }
    }

    render() {
        return (
            <p>Hello</p>
        );
    }
}

ReactDOM.render(<Tool />, document.getElementById("tool"))