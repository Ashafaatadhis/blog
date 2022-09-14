import React from "react";
import Card from "./card/Card";
import axios from "../../api/axios";
import "./content.css";
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: {}, msg: "", serverUrl: "" };
  }

  state = {};
  componentDidMount() {
    (async () => {
      const data = await axios.get("post");
      this.setState({
        post: data.data.data,
        msg: data.data.msg,
        serverUrl: data.data.serverUrl,
      });
    })();
  }
  render() {
    const { post, msg, serverUrl } = this.state;
    // console.log("taed", post);

    return (
      <section className="content">
        <div className="bungkus">
          {post &&
            Object.keys(post).map((key, index) => (
              <Card key={key} data={post[key]} serverUrl={serverUrl} />
            ))}
        </div>
      </section>
    );
  }
}

export default Content;
