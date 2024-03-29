const { NumberOfItemPerPage } = require("../../constant/generalVariable");
const { genreList } = require("../../constant/generalVariable");
const { popularBooksDB, popularBookGenreDB, searchBooksDB, autoCompleteBooksDB, booksDetailDB, multipleBooksDB } = require("../../Data/books/booksDataAccess");
const ErrorHandler = require("../../util/errorHandler");

const getPopularBooks = async () => {
    try {
        const data = await popularBooksDB()
        return data
    } catch (error) {
        throw error
    }
}

//Incomplete Code for this
const getPopularBooksGenre = async (genre, page) => {
    try {

        if (!genreList.includes(genre)) {
            throw new ErrorHandler("genre does not exist", 404)
        }

        if (typeof searchTerm == 'undefined') {
            searchTerm = " "
        }
        if (typeof page == "undefined") {
            page = 0
        }

        page = page - 1

        skipPage = page * NumberOfItemPerPage

        const data = await popularBookGenreDB(genre, skipPage)
        return data
    } catch (error) {
        throw error
    }
}

const getMultipleBooksById = async (itemsList) => {
    try {

        const data = await multipleBooksDB(itemsList)

        return data

    } catch { }
}

const getSearchBooks = async (searchTerm, page) => {
    try {
        //Handing Emply searchTerm returns a emply array handling that on frontend 
        if (typeof searchTerm == 'undefined') {
            searchTerm = " "
        }
        if (typeof page == 'undefined') {
            page = 0
        }

        page != 0 ? page = page - 1 : page;

        skipPage = page * NumberOfItemPerPage
        console.log(skipPage)
        const data = await searchBooksDB(searchTerm, skipPage)
        return data
    } catch (error) {
        throw error
    }
}

const getAutoCompleteBooks = async (searchTerm) => {
    try {
        //Handing Emply searchTerm returns a emply array handling that on frontend 

        if ((typeof searchTerm === 'undefined') || searchTerm.length === 0) {
            throw new ErrorHandler("searchTerm Empty", 500)
        }
        const data = await autoCompleteBooksDB(searchTerm)
        return data
    } catch (error) {
        throw error
    }
}

const getBooksDetail = async (id) => {
    try {
        if (typeof id === 'undefined') {
            id = " "
        }

        return await booksDetailDB(id)
    } catch (error) {
        throw error
    }
}

module.exports = { getPopularBooks, getPopularBooksGenre, getSearchBooks, getAutoCompleteBooks, getBooksDetail, getMultipleBooksById }