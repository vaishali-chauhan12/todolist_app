import { useCallback } from "react"

const ChildrenBlur = ({ children, onBlur, ...props }) => {
  const handleBlur = useCallback(
    (e) => {
      const currentTarget = e.currentTarget

      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        console.error(
          "document.activeElement",
          document.activeElement,
          currentTarget,
        )
        // Check if the new focused element is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          onBlur()
        }
      })
    },
    [onBlur],
  )

  return (
    <div {...props} onBlur={handleBlur} tabIndex="-1">
      {children}
    </div>
  )
}

export default ChildrenBlur
