//
//	2D game sprite class, written by Craig Sturdy
//

var SPRT_IMG_LD = 0;	// Number of sprite images pre-loaded
var NUM_SPRITES = 0;	// Number of sprites initialised

function Sprite( imgPath, x, y, width, height, frames )
{
	this.img = new Image();

	// When the image loads
	this.img.onload = function()
	{	++SPRT_IMG_LD;	 }
	
	this.img.src = imgPath;

	this.Fi = 0;

	this.xPos = x; this.yPos = y;
	this.xVel = 0; this.yVel = 0;

	this.numFrames = frames;
	this.width = width;
	this.height = height;
	this.FrameWidth = this.width / this.numFrames;

	++NUM_SPRITES;	// Iterate number of sprites when loading

	this.state = 0;
	this.direction = RIGHT;

	// Define number of frames to execute without a frame iteration.
	this.frameDelay = 1;
	// Counter of executed frames without a frame iteration.
	this.delayCount = 0;

	// Function to draw and animate sprite
	this.printSprite = function( scrVel )
	{
		if( this.Fi == this.numFrames )
			this.Fi = 0;

		// Calculate position of current frame on spritemap depending upon state
		// and current frame to be drawn
		var currentFrame = ( this.FrameWidth * this.numFrames * this.direction ) +
						   ( this.Fi * this.FrameWidth );

		cnvCxt.drawImage( this.img, currentFrame,
				  this.state * this.height,
				  this.FrameWidth, this.height,
				  this.xPos, this.yPos,
				  this.FrameWidth, this.height );

		// Update sprite position based on state of
		// velocities.  Subtract screen position from
		// xPosition to give scrolling effect.
		this.xPos += Math.round( this.xVel ) - scrVel ;
		this.yPos += Math.round( this.yVel );

		if( this.delayCount >= this.frameDelay )
		{
			this.delayCount = 0;
			++this.Fi;
		}
		else
			++this.delayCount;
	}
}

