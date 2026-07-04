'use client';

export default function SubredditInfo() {
  return (
    <section className="py-6 bg-white border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-[32px] font-bold text-slate-900 mb-2.5">Download Videos from Any Subreddit</h2>
          <p className="text-base text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {`RDT works with every public subreddit — from r/funny and r/aww to niche communities like r/specializedtools. As long as the post is publicly viewable, you can download reddit videos from it. That includes default front-page subreddits with fifty million subscribers and tiny private communities with two hundred members. It also includes NSFW-tagged posts, crosspost content shared between subreddits, and posts hosted on Reddit's v.redd.it media domain. The only hard requirement is that the reddit nsfw video or regular post must be publicly accessible without logging into a Reddit account.`}
          </p>
        </div>
      </div>
    </section>
  );
}
