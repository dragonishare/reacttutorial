import React from "react";
import s from "./index.scss";

console.log("s", s);

class ProductBox extends React.Component {
	render() {
		return (
			<div className={s.name}>
				Hello World!
			</div>
		);
	}
}

module.exports = ProductBox;