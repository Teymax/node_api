#!/usr/bin/env python

import mysql.connector
import sys
import time

class DBManager:
	def __init__(self):
		# params
		self.host = "localhost"
		self.user = "root"
		self.pswd = "admin"
		self.db   = "aptonomy"
		self.tables = {"lots":    "vehicle_infos", \
					   "history": "vehicle_histories", \
					   "photos":  "vehicle_photos"}



	def connect(self):
		self.db_conn = mysql.connector.connect(host = self.host,
		                                       user = self.user,
  		                                       passwd = self.pswd,
  		                                       database = self.db)
		self.db_cursor = self.db_conn.cursor()
		return True



	def disconnect(self):
		self.db_cursor.close()
		self.db_conn.close()


	def sub_nulls(self, input):
		''' subs empty strings with None's in a tuple
		'''
		out_val = []
		for val in input:
			if len(val.strip()) == 0:
				out_val += [None]
			else:
				out_val += [val]
		return tuple(out_val)



	def enter_history(self, lot_id, history_data):
		''' sighting_data format:
			datetime, location, carrier, vehicle_id
		'''
		hist_val = self.sub_nulls(history_data)
		print "+ hist", lot_id, hist_val
		sql = "INSERT INTO " + self.tables["history"] + \
			  " (date, location, towing_company, createdAt, updatedAt, vehicle_id) " + \
			  "VALUES (%s, %s, %s, %s, %s, %s)"  
		cur_datetime = time.strftime("20%y-%m-%d %H:%M:%S")
		print "at", cur_datetime
		self.db_cursor.execute(sql, hist_val[:3] + (cur_datetime, cur_datetime, lot_id))
		self.db_conn.commit()
		return self.db_cursor.lastrowid




	def lookup_lot_num(self, lot_num):
		if len(lot_num) == 0:
			print "Warning: empty lot#"
			return None
		sql = "SELECT * FROM " + self.tables["lots"] + " WHERE lot_number = '" + lot_num + "'"
		self.db_cursor.execute(sql)
		rows = self.db_cursor.fetchall()
		if len(rows) == 0:
			return None
		if len(rows) > 1:
			print "Warning:", len(rows), "reduntant entires for lot#", lot_num
                        for cur_row in rows:
                                print cur_row
		return rows[0]



	def lookup_LP(self, LP):
		if len(LP) == 0:
			print "Warning: empty LP"
			return None
		sql = "SELECT * FROM " + self.tables["lots"] + " WHERE license_plate = '" + LP + "'"
		self.db_cursor.execute(sql)
		rows = self.db_cursor.fetchall()
		if len(rows) == 0:
			return None
		if len(rows) > 1:
			print "Warning:", len(rows), "reduntant entires for LP", lot_data[0]
                        for cur_row in rows:
                                print cur_row
		return rows[0]


	# todo: add lookup_body() to see if this particular body is already in the DB

	def enter_lot(self, lot_data_in):
		''' lot_data format:
		    lot#, LP, style, make, model, year, color
			return id of the lot (existing or newly entered)
		'''
		lot_data = self.sub_nulls(lot_data_in)
		
		if len(lot_data) != 7:
			print "Error: wrong lot data:", lot_data, len(lot_data)
			return None
                print "+ lot", lot_data
		# check if we already have this lot, first by lot #, then LP		
		if lot_data[0] is not None and len(lot_data[0]) != 0:
			lot_row = self.lookup_lot_num(lot_data[0])
			if lot_row is not None:
				print "Found", lot_row
				return lot_row[0]
		if lot_data[1] is not None and len(lot_data[1]) != 0:
			lot_row = self.lookup_LP(lot_data[1])
			if lot_row is not None:
				print "Found", lot_row				
				return lot_row[0]
		# todo : add search by body
		
		# lot not found in DB, adding it
		print "inserting", lot_data
		sql = "INSERT INTO " + self.tables["lots"] + \
			  " (lot_number, license_plate, type, make, model, year, color, last_seen, createdAt, updatedAt) " + \
			  "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"  
		cur_datetime = time.strftime("20%y-%m-%d %H:%M:%S")
		print "at", cur_datetime
		self.db_cursor.execute(sql, lot_data + (None, cur_datetime, cur_datetime))
		self.db_conn.commit()
		return self.db_cursor.lastrowid



	#def enter_imagery(self, lot_id)


	def enter_dataset(self, lot_data, history_data):
		lot_id = self.enter_lot(lot_data)
		hist_id = self.enter_history(lot_id, history_data)
		return hist_id



	def dump_db(self):
		sql = "SELECT * FROM " + self.table
		self.db_cursor.execute(sql)		
		rows = self.db_cursor.fetchall()
		for cur_row in rows:
			print "-", cur_row



###### Test ######
def test_lookup(db_man):
	#ret = db_man.lookup_ws("20190701_083542_001")
	ret = db_man.lookup_ws("1232456")
	print ret
	for x in ret:
		print(x)


def test_add(db_man):
	test_entry = ("1234568", None, None, None, None, None, None)
	print db_man.enter_lot(test_entry)



if __name__ == "__main__":
	import time
	
	db = DBManager()
	if db.connect():
	        test_add(db)
