Colorsmosis is a tool to grab colors from your own images, and create 
a color palette from them! Users can upload an image, adjust how colors they want from their image, drag the pins to pick colors, and copy all hexcodes onto their clipboards.

- Badges:
  - React [blue]
  - Astro [blue]

[Try it out ⮺](https://colorsmosis.netlify.app/)

## Uses

- Planning and building out color themes for sites, branding, or just for fun
- Finding the hexcodes of the colors in your images without having to manually color pick using a tool like photoshop/procreate and looking it up

![Colorsmosis preview](/assets/ColorsmosisScreenshot.png)

## Design notes

### User Experience

- I tried to make it as easy to use as possible, with clear indicators for users to follow
- works on mobile!
- background colors are as simple as possible to not distract from the image the user might be uploading, and the image covers almost the entire screen
- color palette stack was modeled after the color cards at home depot/lowes' paint section :)

### Pin and Pin Overlay

The challenging part of this was figuring out the code architecture. 
After doing some research on how I could pull color information on the image, I saw that I needed 2 main things. 
- A canvas compoenent, which I called the pinoverlay, that held the image and 
- pin component that a user could drag around on top of that image and display a color preview.

I had a bit of back and forth about what each component should be handling. Originally, the pin was responsible for both picking color and figuring out where it should be generated on the canvas. However:

- Having the pin figure out where it should be on the canvas was messy. It meant each pin had to know the canvas boundaries and if they got updated when the user switched pictures
- Having the pin pick the color meant color data needed to be passed up multiple levels from pin → pinoverlay → root component, which in turn needed to pass it to the palette for display
- It’s a lot easier to have the pin be almost entirely visual,with the only state being its previous color. It gets its data to display (coords, color) from the parent PinOverlay.

I refactored once it became clear that keeping it the old way was going to be a bigger hassle.

**More information about decisions like this like this can be found on the project's github!

[Github ⮺](https://github.com/DanNguyen8189/colorsmosis)