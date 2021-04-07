const buildGolfCourseIdsUrl = (golfCourseIds) => {
    const numberOfCourses = golfCourseIds.length;
    let path = '/golf-courses/?'
    for (var i = 0; i < numberOfCourses; i++) {
        const golfCourseId = golfCourseIds[i];
        let queryParamPiece = null;
        if (i === numberOfCourses - 1) {
            queryParamPiece = `id=${golfCourseId}`
        } else {
            queryParamPiece = `id=${golfCourseId}&`
        }
        path = path.concat(queryParamPiece);
    }

    return path;
}

export { buildGolfCourseIdsUrl };
