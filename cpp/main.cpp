#include <chrono>
#include <cstdlib>
#include <iostream>
#include <thread>
#include <vector>

void play_audio_exact_5_minutes(const std::string &filename) {
  std::string cmd =
      "ffmpeg -hide_banner -loglevel error -stream_loop -1 -t 300 -i " +
      filename + " -f alsa default > /dev/null 2>&1 & echo $! > ffmpeg.pid";
  std::system(cmd.c_str());

  std::this_thread::sleep_for(std::chrono::seconds(300));

  std::system("kill $(cat ffmpeg.pid) 2>/dev/null");
  std::system("rm ffmpeg.pid");
}

int main() {
  std::vector<std::string> audio_files = {"drone.mp3",     "fire.mp3",
                                          "explosion.mp3", "thunder.mp3",
                                          "emptiness.mp3", "morphing.mp3"};

  for (const auto &file : audio_files) {
    std::cout << "Playing " << file << " for exactly 5 minutes..." << std::endl;
    play_audio_exact_5_minutes(file);
  }

  std::cout << "All audio intervals ended." << std::endl;
  return 0;
}
