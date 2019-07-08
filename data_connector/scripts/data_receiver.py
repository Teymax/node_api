#!/usr/bin/env python


import time
import sys
import os
from os import path
import shutil
import errno
import time

import utilities as ut
from database_manager import DBManager

class DataReceiver:
	def __init__(self):
		# params
		self.run_delay = 5 #60

		self.data_root = "/var/www/html/aptonomy/data/"
		self.xmit_dir = self.data_root + "xmit/"
		self.data_fname = "data.csv"
		self.photo_root = self.data_root + "vehicle_photos/"
		self.location_names = {"001": "Sublot", "002": "Mainlot"}
                
		self.db_man = DBManager()


	def parse_ds_params(self, ds_id):
		return (ds_id[2:4], ds_id[4:6], ds_id[6:8], ds_id[9:11], ds_id[11:13], ds_id[13:15], ds_id[16:19])



	def run(self):
		while True:
			self.db_man.connect()
                        
			# check for new dataset xfers
			ds_list = os.listdir(self.xmit_dir)
			for cur_ds in ds_list:
				# unwrap the dataset
				ds_root, ds_ext = path.splitext(cur_ds)
				if ds_ext != ".tgz":
					print "Skipping unknown file", cur_ds
					continue
				ut.shell_cmd("tar xfz %s/%s -C %s" % (self.xmit_dir, cur_ds, self.xmit_dir), True)

				# look at the data
				ds_root_abs = "%s/%s/" % (self.xmit_dir, ds_root)
				ds_data = ut.load_csv("%s/%s/%s" % (self.xmit_dir, ds_root, self.data_fname))
				if len(ds_data) == 0:
					print "Warning: empty dataset", ds_root
					continue

				# push in the data
				ds_params = self.parse_ds_params(ds_root)		
				entry_date = "20%s-%s-%s %s:%s:%s" % ds_params[:6]
				for row in ds_data:
					print row
					hist_id = self.db_man.enter_dataset(row[2:9], (entry_date, self.location_names[ds_params[6]], row[9]))					

					# prepare photo storage 
					img_dst_dir = "%s/%s/%s/" % (self.photo_root, ds_params[6], "/".join(ds_params[:3]))
					ut.mkdir(img_dst_dir)

					# copy over the photos
					img_src_dir = ds_root_abs + "raw/"
					img_list = os.listdir(img_src_dir)		
					for cur_img in img_list:
						shutil.copy2(img_src_dir + cur_img, img_dst_dir + cur_img)

					img_src_dir = ds_root_abs + "thm/"
					img_list = os.listdir(img_src_dir)		
					for cur_img in img_list:
						img_root, img_ext = path.splitext(cur_img)
						shutil.copy2(img_src_dir + cur_img, "%s/%s_t%s" % (img_dst_dir, img_root, img_ext))

					#img_src_dir = ds_root_abs + "ico/"
					#img_list = os.listdir(img_src_dir)		
					#for cur_img in img_list:
				#		img_root, img_ext = path.splitext(cur_img)
			#			shutil.copy2(img_src_dir + cur_img, "%s/%s_i%s" % (img_dst_dir, img_root, img_ext))

					# cleanup
				shutil.rmtree(ds_root_abs)

			self.db_man.disconnect()                                
			break
			time.sleep(self.run_delay)



if __name__ == "__main__":
	monitor = DataReceiver()
	monitor.run()
