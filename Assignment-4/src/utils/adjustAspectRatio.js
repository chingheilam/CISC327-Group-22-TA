export function adjustAspectRatio(
  windowWidth,
  windowHeight,
  aspectRatio = 16 / 9,
) {
  const windowRatio = windowWidth / windowHeight

  if (windowRatio > aspectRatio) {
    // 窗口过扁，需要左右留白
    const contentHeight = windowHeight
    const contentWidth = contentHeight * aspectRatio // 根据高度调整宽度
    return {
      width: `${contentWidth}px`,
      height: `${contentHeight}px`,
      margin: '0 auto', // 水平居中
    }
  } else {
    // 窗口过窄，需要上下留白
    const contentWidth = windowWidth
    const contentHeight = contentWidth / aspectRatio // 根据宽度调整高度
    return {
      width: `${contentWidth}px`,
      height: `${contentHeight}px`,
      margin: 'auto 0', // 垂直居中
    }
  }
}
