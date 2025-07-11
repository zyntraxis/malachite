from pydub import AudioSegment
from pydub.generators import Sine
from pydub.effects import normalize
import os

duration_ms = 5 * 60 * 1000          # 5 минут в миллисекундах
break_duration_ms = 20 * 1000        # 20 секунд взрыва
build_up_duration_ms = duration_ms - break_duration_ms

build_up = AudioSegment.silent(duration=0)

for i in range(0, build_up_duration_ms, 1000):
    freq = 100 + (i / build_up_duration_ms) * 500
    volume = -20 + (i / build_up_duration_ms) * 20
    tone = Sine(freq).to_audio_segment(duration=1000).apply_gain(volume)
    build_up += tone

# Проверяем, что файл с взрывом есть
explosion_path = "grenade_explosion.mp3"
if not os.path.isfile(explosion_path):
    raise FileNotFoundError(f"Файл {explosion_path} не найден! Положи звук взрыва гранаты в эту папку.")

explosion = AudioSegment.from_file(explosion_path)

# Обрезаем или дополняем звук до ровно 20 секунд
if len(explosion) > break_duration_ms:
    explosion = explosion[:break_duration_ms]
else:
    explosion = explosion + AudioSegment.silent(duration=break_duration_ms - len(explosion))

final_audio = build_up + explosion
final_audio = normalize(final_audio)

output_path = "5min_with_grenade_explosion.mp3"
final_audio.export(output_path, format="mp3")

print(f"Готово! Файл сохранён: {output_path}")
