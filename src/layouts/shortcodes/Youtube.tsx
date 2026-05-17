import React, { useEffect } from 'react';

const Youtube = ({ id, title, ...rest }: { id: string; title: string; [key: string]: any }) => {
  useEffect(() => {
    import('@justinribeiro/lite-youtube');
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-lg">
      {/* @ts-ignore */}
      <lite-youtube videoid={id} videotitle={title} style={{ width: '100%' }} {...rest} />
    </div>
  );
};

export default Youtube;
