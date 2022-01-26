from copyreg import constructor
import json
from django.http import HttpResponse
from django.shortcuts import render
from utils import get_db_handle
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    # db_handle, client = get_db_handle("SQUIBLER_ENTRY_TEST", "127.0.0.1", 27017, "", "")
    # ctx = db_handle["sections_collection"].find()
    # ctx = list(ctx)
    # print(ctx)
    return HttpResponse("HELLO THERE")

@csrf_exempt
def push_data(request, id=0):
    if request.method == 'POST':
        print(request.body)
        data = json.loads(request.body)
        try:
            db_handle, client = get_db_handle("SQUIBLER_ENTRY_TEST", "127.0.0.1", 27017, "", "")
            ctx = db_handle["sections_collection"]
            #   first clear previous data in the collection
            ctx.delete_many({})
            id = ctx.insert_one(data)
        except Exception as err:
            print(err)
            return HttpResponse("Couldn't connect to MongoDB database server. Internal Server Error", status=500)
        return HttpResponse("Successfully pushed data", status=200)
    elif request.method == 'GET':
        return HttpResponse("Please use POST method with JSON object in body to insert into MongoDB database server.", status=400)

@csrf_exempt
def pull_data(request):
    if request.method == 'GET':
        try:
            db_handle, client = get_db_handle("SQUIBLER_ENTRY_TEST", "127.0.0.1", 27017, "", "")
            data = list(db_handle["sections_collection"].find())
            data = data[-1]["_"]
            data = json.dumps(data)
        except Exception as err:
            print(err)
            return HttpResponse("Couldn't connect to MongoDB database server. Internal Server Error", status=500)
        return HttpResponse(data, content_type='application/json', status=200)
    elif request.method == 'POST':
        return HttpResponse("Please use GET method to fetch data from MongoDB database server.", status=400)