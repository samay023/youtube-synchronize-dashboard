interface Props extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  videoId: string;
  title: string;
}

export const YoutubeVideoFrame = ({ videoId, title }: Props) => {
  return (
    <div>
      <iframe
        width="860"
        height="484"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
