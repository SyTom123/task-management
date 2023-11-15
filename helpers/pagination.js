module.exports = (objecPagination, query, countRecord) => {
    if(query.page) {
        objecPagination.currentPage = +query.page;
    }
    if(query.limit) {
        objecPagination.limitItems = +query.limit;
    }
    objecPagination.skip = (objecPagination.currentPage - 1) * objecPagination.limitItems;
    objecPagination.totalPage = Math.ceil(countRecord / objecPagination.limitItems);
    return objecPagination;
}