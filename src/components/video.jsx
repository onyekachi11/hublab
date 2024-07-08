"use client";

const VideoPlayer = ({ videoUrl = "/videos/connect_wallet_video.mp4" }) => {
  return (
    <video
      // controls
      autoPlay
      muted
      loop
      className="w-full h-full object-cover text-primary"
    >
      <source src={videoUrl} type="video/mp4" />
      <source src={videoUrl} type="video/webm" />
      <source src={videoUrl} type="video/ogg" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
