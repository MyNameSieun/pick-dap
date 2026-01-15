import { CONTENTS } from '../../../constants/contents';

export type ContentItem = (typeof CONTENTS)[number];

export type ContentId = ContentItem['id'];
