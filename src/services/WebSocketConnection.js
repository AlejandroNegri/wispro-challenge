import React from "react";
import { connect } from "react-redux";
import { setGraphData } from "../store/actions/appActions";

class WebSocketConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      messages: [],
      myInterval: null,
    };

    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getName = this.getName.bind(this);
    this.mockWebSocketData = this.mockWebSocketData.bind(this);
  }

  componentDidMount() {
    this.createWebSocket();
    //mock data
    var interval = setInterval(this.mockWebSocketData, 1000);
    this.setState({ myInterval: interval });
  }

  mockWebSocketData() {
    let data = {
      cpuUsage: Math.floor(Math.random() * 100),
      ramUsage: Math.floor(Math.random() * 100),
      netUsage: Math.floor(Math.random() * 50),
    };

    if (data !== "Hello from server, Alex!") {
      this.setState({ messages: [...this.state.messages, data] });
    }
    this.props.setGraphData(this.state.messages);
  }

  componentDidUpdate() {
    if (!this.ws) {
      return;
    }

    if (this.ws.readyState === this.ws.CLOSED) {
      this.createWebSocket();
    }
  }

  componentWillUnmount() {
    if (!this.ws) {
      return;
    }
    this.ws.close();
    clearInterval(this.state.myInterval);
  }

  onOpen(e) {
    try {
      this.ws.send("Hello I am Alex");
    } catch (err) {
      console.log("Got invalid message from websocket on open", err, e.data);
    }
  }

  onMessage(e) {
    try {
      if (e.data !== "Hello from server, Alex!") {
        this.setState({ messages: [...this.state.messages, e.data] });
      }
    } catch (err) {
      console.log("Got invalid message from websocket on message", err, e.data);
    }
  }

  onClose(e) {
    clearInterval(this.mockWebSocketData);
    if (!e.wasClean) {
      //   console.log({ error: `WebSocket error: ${e.code} ${e.reason}` });
      this.createWebSocket();
    }
  }

  onError(e) {
    //console.log("received websocket error", e);
  }

  createWebSocket() {
    this.ws = new WebSocket(
      "wss://javascript.info/article/websocket/demo/hello"
    );
    this.ws.onmessage = (e) => this.onMessage(e);
    this.ws.onerror = (e) => this.onError(e);
    this.ws.onclose = (e) => this.onClose(e);
    this.ws.onopen = (e) => this.onOpen(e);
  }

  handleClick(text) {
    this.ws.send(
      JSON.stringify({
        client: this.state.client,
        message: text,
      })
    );
  }

  getName(name) {
    this.setState({ client: name });
  }

  render() {
    return <></>;
  }
}

const mapDispatchToProps = { setGraphData };

export default connect(null, mapDispatchToProps)(WebSocketConnection);
