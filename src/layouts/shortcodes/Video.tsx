import React from 'react';
function Video({ title, src, ...rest }: { title: string; src: string; [key: string]: any }) {
  return (
    <div className="w-full overflow-hidden rounded-lg">
      <video className="w-full" controls {...rest}>
        <source src={src.match(/^http/) ? src : `/videos/${src}`} type="video/mp4" />
        {title}
      </video>
    </div>
  );
}

export default Video;
