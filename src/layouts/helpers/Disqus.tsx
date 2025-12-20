import mainConfig from '@/config/main-config.json';
import { DiscussionEmbed } from 'disqus-react';
import React from 'react';

const Disqus = ({ className }: { className?: string }) => {
  const { disqus } = mainConfig;
  return (
    <div className={className}>
      {disqus.enable && <DiscussionEmbed shortname={disqus.shortname} config={disqus.settings} />}
    </div>
  );
};

export default Disqus;
