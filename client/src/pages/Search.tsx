
function Search() {
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2">
            <form>
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap">Search Term:</label>
                    <input 
                        type="text"
                        id="searchTerm"
                        placeholder="Search..." 
                        className="order rounded-lg p-3 w-full" 
                    />
                </div>
            </form>
        </div>
        <div className="">
            <h1>Listing Result:</h1>
        </div>
    </div>
  )
}

export default Search