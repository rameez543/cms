//category tree generating function

export const categoryTree = (categories) => {
    const parentObject = {}
    if (categories && categories.data && categories.data.length > 0) {
        for (let item of categories.data) {
            let ancesterID = item.parentCategory
            const ancesterNameArray = []
            while (ancesterID || ancesterID === 0) {
                const ancestorObject = categories.data.find(category => category.id === ancesterID)
                if (ancestorObject) {
                    ancesterNameArray.push(ancestorObject.categoryName)
                    ancesterID = ancestorObject.parentCategory
                }
                else {
                    ancesterID = null
                }
            }
            Object.assign(parentObject, { [item.id]: ancesterNameArray.reverse() })
        }
    }
    return parentObject

}