import { toast } from 'sonner'
import { X } from '@phosphor-icons/react'
import { KeyboardEvent } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface Tag {
  id: string
  name: string
}

export const InputTags = () => {
  const { control } = useFormContext()
  const { append, fields, remove } = useFieldArray({ name: 'tags', control })

  const tags = fields as Tag[]

  const onKeyDownTagName = (event: KeyboardEvent<HTMLInputElement>) => {
    const tagName = (event.currentTarget.value ?? '').trimStart().trimEnd()
    const isEnterEvent = event.code === 'Enter' || event.code === 'NumpadEnter'

    if (!isEnterEvent || tagName === '') {
      return
    }

    if (fields.length >= 5) {
      toast.warning('Você atingiu o limite de 5 tags!')
      return
    }

    const hasAlreadyCreated = tags.findIndex(tag => tag.name === tagName)

    if (hasAlreadyCreated >= 0) {
      toast.error('Você já cadastrou essa tag!')
      return
    }

    append({ name: tagName })
    event.currentTarget.value = ''
  }

  return (
    <fieldset className={styles.container}>
      <label htmlFor="tags">Tags</label>
      <div className={styles.content}>
        {tags.map((tag, index) => (
          <span key={tag.id} className={styles.tag}>
            {tag.name}
            <button type="button" onClick={() => remove(index)}>
              <X size={10} weight="bold" />
            </button>
          </span>
        ))}
        <input
          name="tags"
          maxLength={32}
          onKeyDown={onKeyDownTagName}
          id="input-tag-name"
          placeholder="descreva o nome da tag"
        />
      </div>
    </fieldset>
  )
}
