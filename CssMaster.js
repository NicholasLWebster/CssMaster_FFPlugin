const CssMaster = {
	// Configuration Props:
	targetingModifierKeyCode : 16, // Shift
	disableElementHotKeyCode : 173, // 'shift' + '-' which is technically '_'
	fullscreenElementHotKeyCode : 61, // '+' or '='
	targetedBorderStyle : "2px solid red",
	targetedBorderOffset : "-6",
	targetedBackgroundColorStyle : "rgba(0,0,0,0.5)",


	// Variable Props:
	isTargeting : false,
	targetedElement : null,
	targetedElementPreviousBorderStyle : "",
	targetedElementPreviousBorderOffset : "",
	targetedElementPreviousBackgroundStyle : "",


	handleKeyDownEvent : (e) => {
		//console.log("Key was pressed: " + e.keyCode);
		//console.log("isTargeting: " + CssMaster.isTargeting);
		if(CssMaster.isTargeting && e.keyCode === CssMaster.disableElementHotKeyCode && CssMaster.targetedElement != null) {
			// User is holding the the targeting modifier key and pressed the disable element key.
			//console.log("Disable target element key combo pressed.");
			CssMaster.disableTargetedElement();
		}
		if(CssMaster.isTargeting && e.keyCode === CssMaster.fullscreenElementHotKeyCode && CssMaster.targetedElement != null) {
			// User is holding the the targeting modifier key and pressed the disable element key.
			//console.log("Fullscreen target element key combo pressed.");
			CssMaster.fullscreenTargetedElement();
		}
		else if (!CssMaster.isTargeting && e.keyCode === CssMaster.targetingModifierKeyCode) {
			// User just pressed the targeting key
			CssMaster.enableTargeting();
		}
	},

	handleKeyUpEvent : (e) => {
		if(CssMaster.isTargeting && e.keyCode === CssMaster.targetingModifierKeyCode) {
			CssMaster.disableTargeting();
		}
	},

	handleMouseOverEvent : (e) => {
		if(CssMaster.isTargeting) { // no point tracking hover over element if we aren't targeting.
			CssMaster.restoreCurrentTargetElementToDefault();
			//console.log("Mouse over event while targeting");
			var xMousePosition = e.clientX; 
			var yMousePosition = e.clientY;
			//console.log("Mouse x: " + xMousePosition + " Mouse y: " + yMousePosition);
			CssMaster.targetElementAt(xMousePosition, yMousePosition);
		}
	},

	targetElementAt : (x, y) => {
	    //console.log("Targeting new element");
	    var elementMouseIsOver = document.elementFromPoint(x, y);
	    console.log("New Target:", elementMouseIsOver);
		CssMaster.targetedElement = elementMouseIsOver;
		CssMaster.targetedElementPreviousBorderStyle = elementMouseIsOver.style.border;
		CssMaster.targetedElementPreviousBorderOffset = elementMouseIsOver.style.outlineOffset;
		CssMaster.targetedElementPreviousBackgroundStyle = elementMouseIsOver.style.backgroundColor;
	    CssMaster.targetedElement.style.border = CssMaster.targetedBorderStyle;
	    CssMaster.targetedElement.style.outlineOffset = CssMaster.targetedBorderOffset;
	    CssMaster.targetedElement.style.backgroundColor = CssMaster.targetedBackgroundColorStyle;
	},

	restoreCurrentTargetElementToDefault : () => {
		if(CssMaster.targetedElement != null){
			// Set current target back to it's default css.
			CssMaster.targetedElement.style.border = CssMaster.targetedElementPreviousBorderStyle;
			CssMaster.targetedElement.style.outlineOffset = CssMaster.targetedElementPreviousBorderOffset;
			CssMaster.targetedElement.style.backgroundColor = CssMaster.targetedElementPreviousBackgroundStyle;
		}
	},

	enableTargeting : () => {
		//console.log("Enabling targeting...");
		CssMaster.isTargeting = true;
	},

	disableTargeting : () => {
		//console.log("disablingTargeting targeting...");
		CssMaster.isTargeting = false;
		CssMaster.restoreCurrentTargetElementToDefault();
	},

	disableTargetedElement : () => {
		console.log("Disabling element: " + CssMaster.targetedElement);
		CssMaster.targetedElement.style.display = "none";
	},

	fullscreenTargetedElement : () => {
		console.log("Fullscreening element: " + CssMaster.targetedElement);
		CssMaster.targetedElement.style.position = "fixed";
		CssMaster.targetedElement.style.width = "100%";
		CssMaster.targetedElement.style.height = "100%";
		CssMaster.targetedElement.style.top = "0px";
		CssMaster.targetedElement.style.left = "0px";
		CssMaster.targetedElement.style.backgroundColor = "0,0,0";
		CssMaster.targetedElement.style.zIndex = "500";
		CssMaster.targetedElement.border = "";
		document.body.style.overflow = "hidden";
	},
};

// Register event handlers:
document.addEventListener('keydown', CssMaster.handleKeyDownEvent);
document.addEventListener('keyup', CssMaster.handleKeyUpEvent);
window.addEventListener("mouseover", CssMaster.handleMouseOverEvent);
