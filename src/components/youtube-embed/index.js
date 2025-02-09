import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
  <div className="overflow-hidden h-fit w-full relative bg-primary">
    <iframe
      className="absolute left-0 top-0 h-full w-full"
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
