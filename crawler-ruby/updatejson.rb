require 'json'
require 'securerandom'

json = JSON.load(File.read('./snrintent.json'))

f = File.open('./scraped100.txt')

until f.eof?
  s  = SecureRandom.hex
  id = (s[0..7] + '-' + s[8..11] + '-' + s[12..15] + '-' + s[16..19] + '-' + s[20..-1])
  json['userSays'].push(
    "id": id,
    "data": [
      { "text": f.readline.chomp, }
    ],
    "isTemplate": false,
    "count": 0,
    "updated": 1541805351,
    "isAuto": false
  )
end

File.open('./snrintent.json', 'w+') { |f| f.write JSON.pretty_generate(json) }
