This shader is designed to add variation to repeated objects in a scene without having to apply a different material over and over for different objects

## Uses

- Repeating assets like grass, lanterns, rocks, or trees
- Soft visual variation across groups of similar objects
- Fading objects into the background with a multipy blend mode

<!-- ### Preview

![Object Variation Shader preview](https://via.placeholder.com/1200x675) -->

## Design Notes and Considerations

The crux of this shader is that it calcaulates distance between the object and the camera. The color variation path makes use of a sine wave built from the object's x,y, and z coordinates to lerp between 2 assigned colors (or textures). So based on where the object is located in the world, it'll be assigned a color or texture that's at or somewhere in between the 2 inputted by the artist.

There's less variation between objects the farther away we get from the camera, to give these objects a more atmospheric look

There was a problem I found using a sine wave as the lerp node's input. It's a predictable shape, so a large group of objects assigned the material from this shader would have a noticeable pattern to them, sort of like a checkerboard. How do I add randomness to this pattern??

The solution found was to make variation in the wave's frequency at different points along it. To do that, I formed more sine waves out of the x,y, and z coordinates, but scaled them differently. I then then combined them with the first one! This forms a random looking, jagged sine wave that acts like a random input.


