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

var SPRT_IMG_LD = 0;	// Number of sprite images pre-loaded
var NUM_SPRITES = 0;	// Number of sprites initialised


// Code is functional, though as of 09/09/2010 still needs
// some tinkering in order to function as a stand alone object

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
		// xPosition to allow scrolling effect.
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

