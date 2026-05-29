export function rowToTrade(row) {
  return {
    id: row.id,
    owner: row.owner,
    title: row.title,
    note: row.note || "",
    tag: row.tag,
    my: JSON.parse(row.my_json || "[]"),
    their: JSON.parse(row.their_json || "[]"),
    likes: Number(row.likes) || 0,
    commentsOpen: false,
    createdAt: row.created_at,
    decidedAt: row.decided_at || undefined,
    votes: {
      W: Number(row.vote_w) || 0,
      F: Number(row.vote_f) || 0,
      L: Number(row.vote_l) || 0
    }
  };
}
