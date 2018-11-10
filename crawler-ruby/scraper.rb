require 'mechanize'

mechanize = Mechanize.new

File.open('./scraped.txt', 'w+') do |f|
  (1..764).each do |i|
    print "\rscraping page #{i}..."
    page = mechanize.get("https://community.themix.org.uk/categories/sex-relationships/p#{i}")
    page.search('td.DiscussionName').text.split("\n").map(&:strip).reject(&:empty?).each do |title|
      f.write(title)
      f.write("\n")
    end
  end
  puts "\rdone!"
end
