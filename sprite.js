/* Sprite.js - Simple 2D Sprite Object for Javascript and Canvas
 *
 * Copyright (C) 2010 Craig Sturdy
 *
 * Email: craig <at> sturd <dot> co <dot> uk
 * Example Usage: http://www.sturd.co.uk/sonicjs/
 *
 * Sprite.js is the legal property of its developers, whose names
 * are too numerous to list here. Please refer to the COPYRIGHT
 * file distributed with this source distribution.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 */

// A little global counter for comparing initialised sprite objects, with
// the number of images loaded into the objects.
// I used it for showing a loading screen

var SPRT_IMG_LD = 0;	// Number of sprite images pre-loaded
var NUM_SPRITES = 0;	// Number of sprites initialised

/* Argument list
 *
 * canvasID	- Canvas DOM reference, for attaching a context
 * imgPath	- Path of image on server for use as sprite animation
 * x, y		- Coordinates of sprite to be drawn on the canvas
 * height, width- Height and width of individual frames on the canvas
 * frames	- Number of frames in the initial state of the sprite
 */
function Sprite( canvasID, imgPath, x, y, width, height, frames )
{
	var cnvs_cxt = document.getElementById( canvasID ).getContext( '2d' );
	var img = new Image();

	++NUM_SPRITES;	// Iterate number of sprites when loading

	// Iterate the loaded images counter when the image
	// finishes downloading
	img.onload = function()
	{    ++SPRT_IMG_LD;    }
	
	img.src = imgPath;

	var Fi = 0;

	var xPos = x; yPos = y;
	this.xVel = 0; this.yVel = 0;

	this.numFrames = frames;
	this.width = width;
	this.height = height;
	this.FrameWidth = this.width / this.numFrames;

	this.state = 0;
	this.direction = RIGHT;

	// Define number of frames to execute without a frame iteration.
	this.frameDelay = 1;
	// Counter of executed frames without a frame iteration.
	this.delayCount = 0;

	// Function to draw and animate sprite
	this.printSprite = function( scrVel )
	{
		if( Fi == this.numFrames )
			Fi = 0;

		// Calculate position of current frame on spritemap depending upon state
		// and current frame to be drawn
		var currentFrame = ( this.FrameWidth * this.numFrames * this.direction ) +
						   ( Fi * this.FrameWidth );

		cnvs_cxt.drawImage( img, currentFrame,
				    this.state * this.height,
				    this.FrameWidth, this.height,
				    xPos, yPos,
				    this.FrameWidth, this.height );

		// Update sprite position based on state of
		// velocities.  Subtract screen position from
		// xPosition to allow scrolling effect.
		xPos += Math.round( this.xVel ) - scrVel ;
		yPos += Math.round( this.yVel );

		if( this.delayCount >= this.frameDelay )
		{
			this.delayCount = 0;
			++Fi;
		}
		else
			++this.delayCount;
	}

	// Function to alter state of the sprite
	this.setState = function( newState, frameCount )
	{
		if( this.state != newState )
		{
			this.state = newState;
			this.numFrames = frameCount;
			Fi = 0;
		}
	}

	this.getXPos = function()
	{
		return xPos;
	}
	this.getYPos = function()
	{
		return yPos;
	}

	this.setYPos = function( y )
	{
		yPos = y;
	}
}

