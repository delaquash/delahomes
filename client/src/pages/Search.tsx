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
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                // onChange={handleChange}
              />
              <span>Rent & Sale</span>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={sidebardata.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={sidebardata.type === 'sale'}
                />
                <span>Sale</span>
              </div>
        
    </div>
  );
}

export default Search;
