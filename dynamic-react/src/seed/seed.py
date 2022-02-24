
import os
import json


cwd = os.getcwd()
file_list = os.listdir(cwd + "/assets/gif_frames_png")
file_list.sort()

jsonified = json.dumps(file_list)

new_file = open(cwd + "/seed/gif_1.json", "w")
new_file.write(jsonified)
new_file.close()
