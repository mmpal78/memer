import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import {getImgCtr} from '../js';

import Menu from './Menu';
import TextEditor from './TextEditor';
import Fonts from './FontEditor';
import FontColorEditor from './FontColorEditor';
import Sliders from './Sliders';
import Stroke from './Stroke';
import Canvas from './Canvas';
import Cropper from './Cropper';
import CropBtn from './CropBtn';


import '../css/editor.css';
import '../css/tools.css';

class Editor extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			showTextEditor: false,
			showFonts: false,
			showFontColor: false,
			showSliders: false,
			showStroke: false,
			showResult: false,
			showCropper: false,
			showCropperButton: true
		};
	};

	componentDidMount(){
		this.isIpad();
		window.addEventListener('resize', this.isIpad);
		
	};

	isIpad = () => {
		navigator.appVersion.search(/iPad|iPhone|Mobile/) >= 0 ? 
		this.setState({showCropperButton: false}) : this.setState({showCropperButton: true})
	};

	toggleTextEditor = () => {
		this.setState({
			showTextEditor: !this.state.showTextEditor
		});
	};

	toggleFont = () => {
		this.setState({
			showFonts: !this.state.showFonts
		});
	};

	toggleFontColor = () => {
		this.setState({
			showFontColor: !this.state.showFontColor
		});
	};

	toggleSliders = () => {
		this.setState({
			showSliders: !this.state.showSliders
		});
	};

	toggleStroke = () => {
		this.setState({
			showStroke: !this.state.showStroke
		});
	};

	toggleResult = () => {
		this.setState({
			showResult: !this.state.showResult
		});
	}

	toggleCropper = () => {
		this.setState({
			showCropper: !this.state.showCropper
		});
	};

	update = () => {
		this.setState({
			update: !this.state.update
		});
	};

	crop = () => {
		let ctr = getImgCtr();
		this.props.dispatch(actions.edit_posX(ctr.x));
		this.props.dispatch(actions.edit_posY(ctr.y));
		this.props.dispatch(actions.crop());
	};

	memeIt = () => {
		let link = document.createElement('a');
		link.download = 'MEMER';
		let canvas = document.getElementById('canvas');
		if(this.props.state.clip.x){
			canvas = document.getElementsByClassName('can2')[0];
		}
		let imgURL = canvas.toDataURL("image/png");
		link.href = imgURL;
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		this.props.dispatch(actions.set_meme_result(imgURL));
		document.body.removeChild(link);
		this.toggleResult();

		this.props.dispatch(actions.set_clip({}));

		this.state.showCropper ? this.toggleCropper() : console.log('');
	};

	render(){
		let cropBtn = this.state.showCropperButton ? <CropBtn toggle={this.toggleCropper}/> : undefined;
		let cropper = this.state.showCropper ? <Cropper toggle={this.toggleCropper}/> : undefined;
		let textEditor = this.state.showTextEditor ? <TextEditor toggle={this.toggleTextEditor}/> : undefined;
		let fontEditor = this.state.showFonts ? <Fonts toggle={this.toggleFont} /> : undefined;
		let fontColorEditor = this.state.showFontColor ? <FontColorEditor toggle={this.toggleFontColor}/> : undefined;
		let sliders = this.state.showSliders ? <Sliders toggle={this.toggleSliders} /> : undefined;
		let stroke = this.state.showStroke ? <Stroke toggle={this.toggleStroke} /> : undefined;

		let result = this.state.showResult ? <article className="meme-result-wrapper">
				   								 <div className="x-close" onClick={this.toggleResult}><span>X</span></div>
				   								 <p><span>Downloaded Successfully</span>Enjoy! </p>
												<img id="memeImg" src={this.props.state.imgURL} alt="Your Meme!"/>
											</article> : undefined;
		return(
			<section className="editor">
				<Menu />
				<div className="upper-editor" id="canvasWrapper">
					<div className="resize"></div>
					{cropper}
					<Canvas update={this.update} ref="canvas" />
					{cropBtn}
				</div>
				
				<div className="lower-editor">
					<div className="toolbar-wrapper">
						<article className="edit-text tool" onClick={this.toggleTextEditor}>
							<p className="tool-icon">
								<i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
							</p>
						</article>
						<article className="edit-font tool" onClick={this.toggleFont}>
							<p className="tool-icon">
								<i className="fa fa-font fa-lg" aria-hidden="true"></i>
							</p>
						</article>
						<article className="edit-color tool" onClick={this.toggleFontColor}>
							<p className="tool-icon">
								<i className="fa fa-paint-brush fa-lg" aria-hidden="true"></i>
							</p>
						</article>
						<article className="edit-stroke tool" onClick={this.toggleStroke}>
							<p className="tool-icon">
								S
							</p>
						</article>
						<article className="edit-font-size-position tool" onClick={this.toggleSliders}>
							<p className="tool-icon">
								<i className="fa fa-sliders fa-lg" aria-hidden="true"></i>
							</p>
						</article>
					</div>
					<button type="button" className="btn-meme-it" onClick={this.memeIt}> MEME IT </button>
				</div>
				{textEditor}
				{fontEditor}
				{fontColorEditor}
				{sliders}
				{stroke}
				{result}
				
			</section>
		)
	}
}

const mapStateToProps = (state, props) => ({
	state: state
})

export default connect(mapStateToProps)(Editor);