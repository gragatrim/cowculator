export default function ChangeLog() {
  return (
    <div>
      <h1>Change Log</h1>
      <hr/>

      <div>
        <strong>August 31st, 2023: Change Log + UI Improvements</strong>
        <ul>
          <li>Added the Change Log, to track updates</li>
          <li>Removed "Buy/Craft Updgrade" toggle on the Cooking panel, as there's nothing to upgrade in Cooking</li>
          <li>Reduced size of inputs for Level/Bonuses/Efficiency/XP/Target Level (they don't need to hold 30 digits!)</li>
          <li>Removed "Combat" from the Cowculator, with bosses being released it's been incorrect and there are no plans to update it</li>
          <li>Added validation for a bunch of fields, but probably not them all</li>
          <li>GitHub links in the footer, go request features or report bugs or get into the code with us!</li>
        </ul>
      </div>

      <hr/>

      <div>
        <strong>August 28th, 2023: Support for Skilling Gear</strong>
        <ul>
          <li>Added a new field to each of the skill pages to account for the added efficiency or speed provided by the new skilling gear</li>
        </ul>
      </div>
    </div>
  )
}
